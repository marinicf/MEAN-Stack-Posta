export class User{
  constructor(public username: string, public userId: string, private _token: string){}

  get token(){
    return this._token;
  }
}
