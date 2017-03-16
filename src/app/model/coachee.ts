import {ApiUser} from "./apiUser";
import {Coach} from "./Coach";
export class Coachee implements ApiUser {

  id: string;
  firebaseToken: string;

  email: string

  avatar_url: string;

  display_name: string;

  start_date: string;

  selectedCoach: Coach;

  constructor(id: string) {
    this.id = id;
  }

}
