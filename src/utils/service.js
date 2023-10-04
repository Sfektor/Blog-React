export default class Service {
  baseUrl = "https://blog.kata.academy/api/";

  async regNewUser(username, password, email) {
    const response = await fetch(`${this.baseUrl}users`, {
      method: "POST",
      body: {
        user: {
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          password: password,
        },
      },
    });
    if (response.status === 404) {
      throw new Error("This is end!");
    }
    const data = await response.json();
    return data.user.token;
  }
}
