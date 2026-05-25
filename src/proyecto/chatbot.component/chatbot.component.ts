import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('inputField') inputField!: ElementRef;

  isOpen = false;
  isLoading = false;
  userInput = '';
  messages: Message[] = [];
  usuari: any = null;
  private shouldScroll = false;

  private API_URL = 'http://localhost:3000/api/chat';

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const dades = localStorage.getItem('usuariLoguejat');
    if (dades) this.usuari = JSON.parse(dades);
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      const nom = this.usuari?.nom ?? 'there';
      this.messages.push({
        role: 'assistant',
        content: `👋 Hola ${nom}! Soc l'assistent de Sports Hub. En què et puc ajudar avui?`,
        timestamp: new Date()
      });
      this.shouldScroll = true;
    }
    if (this.isOpen) setTimeout(() => this.inputField?.nativeElement?.focus(), 150);
  }

  sendMessage() {
    const text = this.userInput.trim();
    if (!text || this.isLoading) return;

    this.messages.push({ role: 'user', content: text, timestamp: new Date() });
    this.userInput = '';
    this.isLoading = true;
    this.shouldScroll = true;

    const allMsgs = this.messages.map(m => ({ role: m.role, content: m.content }));
    const firstUser = allMsgs.findIndex(m => m.role === 'user');
    const messages = allMsgs.slice(firstUser).slice(-12);

    const payload: any = { messages };
    if (this.usuari) payload.usuari = { nom: this.usuari.nom, email: this.usuari.email };

    fetch(this.API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) return res.text().then(err => { throw new Error(err); });
        return res.json();
      })
      .then(data => {
        const reply = data.reply ?? 'No he pogut generar una resposta.';
        this.messages.push({ role: 'assistant', content: reply, timestamp: new Date() });
        this.isLoading = false;
        this.shouldScroll = true;
        this.cdr.detectChanges();
      })
      .catch(e => {
        console.error('Error:', e);
        this.messages.push({
          role: 'assistant',
          content: '⚠️ Error de connexió. Torna-ho a intentar.',
          timestamp: new Date()
        });
        this.isLoading = false;
        this.shouldScroll = true;
        this.cdr.detectChanges();
      });
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendMessage(); }
  }

  clearChat() {
    const nom = this.usuari?.nom ?? 'there';
    this.messages = [{
      role: 'assistant',
      content: `👋 Hola ${nom}! En què et puc ajudar?`,
      timestamp: new Date()
    }];
    this.cdr.detectChanges();
  }

  private scrollToBottom() {
    try {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

  formatTime(d: Date) {
    return d.toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' });
  }
}
