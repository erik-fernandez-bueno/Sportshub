import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  templateUrl: './producto.html',
  styleUrls: ['./producto.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ProductoComponent implements OnInit {

  product: any;
  selectedSize: string | null = null;

  products = [
    {
      id: 1,
      name: "Balón de Fútbol",
      price: 25,
      image: "assets/balon_futbol.jpg",
      description: "Balón de fútbol profesional con superficie texturada para mejor control.",
      size: [],
      category: "Balones"
    },
    {
      id: 2,
      name: "Raqueta de Tenis",
      price: 75,
      image: "assets/raqueta_tenis.jpg",
      description: "Raqueta ligera con marco de aluminio y agarre cómodo.",
      size: [],
      category: "Raquetas"
    },
    {
      id: 3,
      name: "Mancuernas de Neopreno 3kg",
      price: 18,
      image: "assets/mancuernas_3kg.jpg",
      description: "Set de mancuernas para ejercicio de fuerza y tonificación.",
      size: [],
      category: "Fitness"
    },
    {
      id: 4,
      name: "Cuerda para Saltar Ajustable",
      price: 12,
      image: "assets/cuerda_saltar.jpg",
      description: "Cuerda ligera con mango ergonómico para entrenamiento cardiovascular.",
      size: [],
      category: "Accesorios"
    },
    {
      id: 5,
      name: "Esterilla de Yoga",
      price: 30,
      image: "assets/esterilla_yoga.jpg",
      description: "Esterilla antideslizante para yoga, pilates y estiramientos.",
      size: [],
      category: "Fitness"
    },
    {
      id: 6,
      name: "Botella Deportiva 1L",
      price: 10,
      image: "assets/botella_deportiva.jpg",
      description: "Botella de agua resistente para hidratación en entrenos.",
      size: [],
      category: "Accesorios"
    },
    {
      id: 7,
      name: "Bandas Elásticas de Resistencia",
      price: 20,
      image: "assets/bandas_resistencia.jpg",
      description: "Juego de bandas con diferentes resistencias para entrenamiento.",
      size: ["X-Light","Light","Medium","Heavy","X-Heavy"],
      category: "Fitness"
    },
    {
      id: 8,
      name: "Guantes de Boxeo",
      price: 35,
      image: "assets/guantes_boxeo.jpg",
      description: "Guantes acolchados para seguridad y confort en boxeo.",
      size: ["M","L"],
      category: "Deportes de contacto"
    },
    {
      id: 9,
      name: "Portería de Fútbol Plegable",
      price: 65,
      image: "assets/porteria_futbol.jpg",
      description: "Portería ligera y fácil de montar para partidos y entrenos.",
      size: [],
      category: "Equipamiento"
    },
    {
      id: 10,
      name: "Cámara Deportiva 4K",
      price: 120,
      image: "assets/camara_4k.jpg",
      description: "Cámara de acción para grabar tus aventuras deportivas.",
      size: [],
      category: "Tecnología"
    },
    {
      id: 11,
      name: 'Pantalón vaquero resistente Hombre Simond Vertika',
      description: 'Ofrecen un talle alto que te da libertad de movimiento, 3 bolsillos prácticos y una cinta para tu cepillo.',
      price: 44.99,
      image: 'assets/Pantalonvaquerohombre.jpg',
      size: ['38', '40', '42', '44', '46', '48'],
      category: 'pantalon'
    },
    {
      id: 12,
      name: 'Bicicleta',
      price: 1200,
      image: 'assets/Bicicletademontanya29.jpg',
      description: 'Tienen dos ruedas.',
      size:  [],
      category: 'vehiculo'
    },
    {
      id: 13,
      name: 'Zapatillas Running Hombre',
      price: 30,
      image: 'assets/ZapatillasRunningKIPRUN.jpg',
      description: 'Amortiguación avanzada y máxima comodidad.',
      size:  ['40','42'],
      category: 'Zapatillas'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(p => p.id === id);

    console.log('PRODUCT:', this.product);
  }

  addToCart() {
    if (this.product?.size?.length && !this.selectedSize) {
      alert('Selecciona una talla');
      this.cartService.addProduct({
        ...this.product,
        quantity: 1,
        selectedSize: this.selectedSize
      });

      this.router.navigate(['/cesta']);
      return;
    }

    this.cartService.addProduct({
      ...this.product,
      quantity: 1,
      selectedSize: this.selectedSize
    });
  }
}
