import { TripListsProps } from './index';
import { TripDetailsProps } from './Routes';

export interface Place {
  id: number;
  slug: string;
  city_slug: string;
  display: string;
  ascii_display: string;
  city_name: string;
  city_ascii_name: string;
  state: string;
  country: string;
  lat: string;
  long: string;
  result_type: string;
  popularity: string;
}

export interface GetPlacesParams {
  q?: string;
  from?: string;
}

export type SearchTripsBody = Pick<
  TripListsProps,
  'date' | 'destination' | 'origin'
>;

export interface Stats {}

export interface Bus {
  active: boolean;
  terminal_ids: string[];
  line_ids: string[];
  stats: Stats;
}

export interface Rides {
  active: boolean;
  stats: Stats;
}

export interface Flights {
  active: boolean;
  carrier_ids: number[];
  airport_ids: number[];
  stats: Stats;
}

export interface Mix {
  active: boolean;
}

export interface TypeOfTransport {
  bus: Bus;
  rides: Rides;
  flights: Flights;
  mix: Mix;
}

export interface Search {
  parent_search_id: number;
  id: number;
  departs: string;
  origin_id: string;
  destination_id: string;
  international: boolean;
  type_of_transport: TypeOfTransport;
  created_at: string;
}

export interface PaymentPlans {
  3: number;
  6: number;
  9: number;
  12: number;
}

export interface Config {
  installments_min_amount: number;
  payment_plans: PaymentPlans;
}

export interface Coordinates {
  lat: number;
  long: number;
}

export interface Terminal {
  id: string;
  name: string;
  city_id: string;
  city_name: string;
  coordinates: Coordinates;
  state_name: string;
  code: string;
}

export interface Line {
  name: string;
  abbr: string;
  human_abbr: string;
  transporter_name: string;
  allows_seat_selection: boolean;
  volatile_pricing: boolean;
  average_ratings: number;
  last_ratings: number[];
  total_ratings: number;
  services: string[];
  service_type: string;
  logo_url: string;
  copyright_protected: boolean;
  ally: boolean;
  ticket_counter_exchange: boolean;
  redirection_info?: string;
  commission_estimate: string;
}
export interface City {
  id: string;
  name: string;
  state: string;
  state_abbr: string;
  country: string;
  country_abbr: string;
}

export interface TripsSearch {
  search: Search;
  config: Config;
  terminals: Record<string, Terminal>;
  lines: Record<string, Line>;
  cities: Record<string, City>;
}

export interface Carriers {}

export interface Airports {}

export interface FareServices {}

export interface InnerCityConnections {}

export interface ProviderDiscount {
  id: string;
  name: string;
  priority?: number;
  availability: number;
  amount: number;
  taxes: number;
  total: number;
}

export interface Pricing {
  amount: number;
  taxes: number;
  total: number;
  discount_type: string;
  discount_availability?: boolean;
  provider_discount: ProviderDiscount;
  total_before_discount: number;
  provider_discounts: ProviderDiscount[];
}

export interface ProviderDiscount3 {
  amount: number;
}

export interface ProviderDiscount4 {
  id: string;
  name: string;
  priority?: number;
  availability: number;
  amount: number;
  taxes: number;
  total: number;
}

export interface RoundTripPricing {
  amount: number;
  taxes: number;
  total: number;
  discount_type: string;
  discount_availability?: boolean;
  provider_discount: ProviderDiscount3;
  total_before_discount: number;
  provider_discounts: ProviderDiscount4[];
}

export interface PassengerType {
  type: string;
  availability: number;
  total: number;
  priority: number;
}

export interface Stop {
  terminal: string;
  departure: string;
  arrival: string;
}

export interface Path {
  schedule?: string;
  provider: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  stops: Stop[];
}

export interface ProviderDiscount5 {
  amount: number;
}

export interface ProviderDiscount6 {
  id: string;
  name: string;
  priority?: number;
  availability: number;
  amount: number;
  taxes: number;
  total: number;
}

export interface DepartureRoundTripPricing {
  amount: number;
  taxes: number;
  total: number;
  discount_type: string;
  discount_availability?: boolean;
  provider_discount: ProviderDiscount5;
  total_before_discount: number;
  provider_discounts: ProviderDiscount6[];
}

export interface Trip {
  id: string;
  origin_id: string;
  destination_id: string;
  origin_code: string;
  destination_code: string;
  pricing: Pricing;
  round_trip_pricing: RoundTripPricing;
  departure: string;
  arrival: string;
  availability: number;
  capacity: number;
  service: string;
  line_id: string;
  stops: number;
  passenger_types: PassengerType[];
  travel_agency: string;
  travel_agency_type: string;
  process_type: string;
  is_buyable: boolean;
  product_id: string;
  transport_type: string;
  duration: number;
  path: Path[];
  has_route_details: boolean;
  variable_departure_time: boolean;
  open_ticket: boolean;
  on_demand: boolean;
  on_demand_caption?: boolean;
  on_demand_legal?: boolean;
  on_demand_seats?: boolean;
  second_floor: boolean;
  departure_round_trip_pricing: DepartureRoundTripPricing;
  allows_seat_selection: boolean;
}

export interface TripsInfo {
  id: number;
  state: string;
  origin_id: number;
  destination_id: number;
  departs: string;
  created_at: string;
  finished_at: string;
  carriers: Carriers;
  airports: Airports;
  fare_services: FareServices;
  lines: Record<string, Line>;
  terminals: Record<string, Terminal>;
  inner_city_connections: InnerCityConnections;
  transport_type: string;
  trips: Trip[];
}

export type TripDetailsRequestParams = TripDetailsProps['trip_id'];

export interface TripDetailsSearch {
  id: number;
  state: string;
  poll_to: string;
  error_code?: number;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface GetTripDetailsParams {
  trip_id: TripDetailsProps['trip_id'];
  details_request_id: number;
}

export interface TripDetails {
  id: number;
  state: string;
  poll_to?: string;
  error_code?: number;
  error_message?: string;
  created_at: string;
  updated_at: string;
  trip: Trip;
  terminals: Record<string, Terminal>;
  lines: Record<string, Line>;
  cities: Record<string, City>;
  bus?: any;
  diagram_type: string;
}
