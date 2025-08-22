import { EndUser } from "./endUser";

export interface Storage {
  saveEndUser(user: EndUser): EndUser;
  asaveEndUser(user: EndUser): Promise<EndUser>;
}

export class InMemoryStorage implements Storage {
  private users: EndUser[] = [];
  saveEndUser(user: EndUser): EndUser {
    this.users.push(user);
    return user;
  }
  async asaveEndUser(user: EndUser): Promise<EndUser> {
    this.users.push(user);
    return user;
  }
}

export class DiskFileStorage implements Storage {
  constructor(private dir: string = "./data") {}
  saveEndUser(user: EndUser): EndUser {
    console.log(`Saving ${user.externalId} to disk`);
    return user;
  }
  async asaveEndUser(user: EndUser): Promise<EndUser> {
    return this.saveEndUser(user);
  }
}

export class CloudStorage implements Storage {
  constructor(private config: any) {}
  saveEndUser(user: EndUser): EndUser {
    console.log(`Saving ${user.externalId} to cloud`);
    return user;
  }
  async asaveEndUser(user: EndUser): Promise<EndUser> {
    return this.saveEndUser(user);
  }
}
