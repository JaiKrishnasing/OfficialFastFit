export const productInformation = [
  {
    productName: "Drinkfles",
    productDescription:
      "Ontdek de ultieme metgezel voor je sportieve avonturen met onze nieuwste rode en zwarte sportbidon. Ontworpen met de perfecte balans tussen stijl en functionaliteit, biedt deze bidon een naadloze ervaring voor sportliefhebbers van alle niveaus. De opvallende combinatie van robuust zwart en levendig rood geeft niet alleen een dynamische uitstraling, maar ook een gevoel van vastberadenheid en kracht.",
    productPrice: 9.99,
    productCollection: "Rood & Zwart",
    productLocationImg: "images/bottle.png",
    productStars: 4,
  },
  {
    productName: "Bokshandschoenen",
    productDescription:
      "Stap in de ring met vertrouwen met onze rode en zwarte bokshandschoenen. Ontworpen met duurzame materialen en een ergonomische pasvorm, bieden deze handschoenen de perfecte balans tussen bescherming en prestatie. De opvallende combinatie van robuust zwart en levendig rood geeft niet alleen een dynamische uitstraling, maar ook een gevoel van vastberadenheid en kracht.",
    productPrice: 16.99,
    productCollection: "Rood & Zwart",
    productLocationImg: "images/boxing gloves.png",
    productStars: 4,
  },
  {
    productName: "FastFit Shirt",
    productDescription:
      "Verrijk je sportieve garderobe met ons dynamische FastFit-shirt in rood en zwart. Ontworpen met geavanceerde ademende stoffen voor maximaal comfort en prestaties, biedt dit shirt een naadloze ervaring voor sportliefhebbers van alle niveaus. De opvallende combinatie van robuust zwart en levendig rood geeft niet alleen een dynamische uitstraling, maar ook een gevoel van vastberadenheid en kracht.",
    productPrice: 23.99,
    productCollection: "Rood & Zwart",
    productLocationImg: "images/shirt.png",
    productStars: 4,
  },
];

export class setPageContent {
  constructor() {
    this.buttons = document.querySelectorAll(".redirect");
    this.productImg = document.getElementById("product-img-js");
    this.productTitle = document.getElementById("information-title-js");
    this.productCollection = document.getElementById(
      "information-collection-js"
    );
    this.productDescription = document.getElementById(
      "information-description"
    );
    this.price = document.getElementById("price-js");
    this.setPageContent = this.setPageContent.bind(this);
  }

  setPageContent(index) {
    this.productImg.src = `${productInformation[index].productLocationImg}`;
    this.productTitle.innerText = `${productInformation[index].productName}`;
    this.productCollection.innerText = `${productInformation[index].productCollection}`;
    this.productDescription.innerText = `${productInformation[index].productDescription}`;
    this.price.innerText = `€${productInformation[index].productPrice}`;
  }
}
