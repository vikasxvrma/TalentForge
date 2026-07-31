import client from "./client";

//  first time when user login using google authenticator 
export async function loginWithGoogle(idToken) {
  const response = await client.post("/auth/google", {
    idToken,
  });

  return response.data;
}

// its when user refreshes browser 
// context is lost , so we can make a fresh call with 
// the token from localStorage and fetch user data 
export async function getCurrentUser()
{
    const response = await client.get("/auth/me");
    return response.data;
}

