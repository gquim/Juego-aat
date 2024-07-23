import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JuegoComponent } from './juego/juego.component';

interface Card {
  id: number;
  image: string;
  flipped: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,FormsModule,JuegoComponent],
  providers:[ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  numPairs: number = 8;
  cards: Card[] = [];
  flippedCards: Card[] = [];
  matchedCards: number = 0;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.setupBoard();
  }

  setupBoard(): void {
    this.api.getImages(this.numPairs).subscribe(images => {
      const cardImages = images.concat(images).sort(() => 0.5 - Math.random());
      this.cards = cardImages.map((image, index) => ({
        id: index,
        image: image,
        flipped: false
      }));
      this.flippedCards = [];
      this.matchedCards = 0;
    });
  }

  flipCard(card: Card): void {
    if (this.flippedCards.length < 2 && !card.flipped) {
      card.flipped = true;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.checkMatch();
      }
    }
  }

  checkMatch(): void {
    const [card1, card2] = this.flippedCards;

    if (card1.image === card2.image) {
      this.matchedCards += 1;
      this.flippedCards = [];

      if (this.matchedCards === this.numPairs) {
        setTimeout(() => alert('Felicidades'), 500);
      }
    } else {
      setTimeout(() => {
        card1.flipped = false;
        card2.flipped = false;
        this.flippedCards = [];
      }, 1000);
    }
  }
  resetGame(): void {
    this.setupBoard();
  }
}