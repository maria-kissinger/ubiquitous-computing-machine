export type TicketType = {
  type: string;
  name: string;
  description: string;
  cost: number;
};

export type Band = {
  id: string;
  name: string;
  date: number;
  location: string;
  imgUrl: string;
  description_blurb: string;
  ticketTypes: TicketType[];
};

export type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};