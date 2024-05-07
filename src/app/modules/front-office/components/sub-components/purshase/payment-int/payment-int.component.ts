import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
declare var Stripe: any; 
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServicePaymentService } from 'src/app/modules/admin/components/sub-components/purshase/service-payment.service';



@Component({
  selector: 'app-payment-int',
  templateUrl: './payment-int.component.html',
  styleUrls: ['./payment-int.component.css']
})
export class PaymentIntComponent implements OnInit {
  private stripe = Stripe('pk_test_51OvQL1JeISkzjGkfSTrBn7LnfxK1m6KxfMhOGjovxnXib39jt0IsnCmat0o5O20vImghVfPiWIOgwOm0KfVrV7rZ00seX3K6Jh'); // Use your Stripe publishable key
  private card: any;
  private UserId!: number;
  private courseId: number = 0;


  @ViewChild('cardElement') cardElementRef!: ElementRef;

  constructor(private paymentService: ServicePaymentService , private router: Router , private route: ActivatedRoute) {}



  amount  : number =0;


  ngOnInit() {
    // Récupération du courseId à partir de l'URL dans un environnement de routage imbriqué
    this.route.parent!.paramMap.subscribe(params => {
      this.courseId = +params.get('id')!;
      

      // Utilisez courseId pour obtenir les détails du cours
      this.paymentService.getCourse(this.courseId).subscribe((course: { price: any; }) => {
        this.amount = course.price * 100;
        console.log(this.amount);
      });
    });

    // Initialisation de Stripe card element
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardElementRef.nativeElement);
  }

  ngAfterViewInit() {
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardElementRef.nativeElement);
  }

  initiatePayment(amount: number) {
   
    console.log('Course ID:', this.courseId);
    const userIdString = localStorage.getItem("userId");
this.UserId = userIdString ? Number(userIdString) : 0; // Utilisez 0 ou une autre valeur par défaut si userIdString est null
console.log("userrrr " , this.UserId);
    this.paymentService.createPaymentIntent(amount).subscribe(response => {
      console.log(response);
      const clientSecret = response.clientSecret;
      this.stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: this.card,  
          billing_details: {
            name: 'Test User',
          },
        },
      })
      .then((result: any) => {
        if (result.error) {
          console.error(result.error.message);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            const  paymentId = result.paymentIntent.id ; 

            this.paymentService.createPurchase(this.UserId, this.courseId,paymentId).subscribe({
              next: (res) => {
                console.log(paymentId);
                console.log('Purchase created:', res);
                console.log('Payment succeeded!');
                this.router.navigate(['/front/main/succeeded']); 

              },
              error: (err) => {
                console.error('Error creating purchase:', err);
              }
            });
           
           

          }
        }
      });
    });
  }
}
