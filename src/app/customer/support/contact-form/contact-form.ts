import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SupabaseService } from '../../../core/services/supabase';
import { SUPPORT_PAGES } from '../support-pages';

const TOPICS = ['order', 'sizing', 'shipping', 'product', 'other'] as const;
type ContactTopic = (typeof TOPICS)[number];

@Component({
  selector: 'app-contact-form',
  imports: [NgTemplateOutlet, ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './contact-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
  private readonly builder = inject(FormBuilder).nonNullable;
  private readonly supabase = inject(SupabaseService);

  protected readonly topics = TOPICS;
  protected readonly privacyRoute = SUPPORT_PAGES.privacy.route;
  protected readonly state = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');
  protected readonly form = this.builder.group({
    fullName: ['', [Validators.required, Validators.maxLength(120), Validators.pattern(/\S/)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    orderReference: ['', Validators.maxLength(100)],
    topic: this.builder.control<ContactTopic | ''>('', Validators.required),
    message: ['', [Validators.required, Validators.maxLength(4000), Validators.pattern(/\S/)]],
  });

  protected invalid(field: keyof ContactForm['form']['controls']): boolean {
    const control = this.form.controls[field];
    return control.touched && control.invalid;
  }

  protected async submit(): Promise<void> {
    if (this.state() === 'sending') {
      return;
    }

    this.state.set('idle');
    this.form.markAllAsTouched();
    const { fullName, email, orderReference, topic, message } = this.form.getRawValue();
    if (this.form.invalid || !topic) {
      return;
    }

    this.state.set('sending');
    try {
      const { error } = await this.supabase.client.from('contact_messages').insert({
        full_name: fullName.trim(),
        email: email.trim(),
        order_reference: orderReference.trim() || null,
        topic,
        message: message.trim(),
      });

      if (error) {
        this.state.set('error');
      } else {
        this.form.reset();
        this.state.set('sent');
      }
    } catch {
      this.state.set('error');
    }
  }
}
