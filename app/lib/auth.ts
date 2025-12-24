// lib/auth.ts


export async function loginUser(email: string, password: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }else {
    console.log(response)
    console.log("Login Success")
  }

  const data = await response.json()
  console.log(data) 
  return response.json // Should include: { access, refresh, user: { tenant_slug, ... } }
}


export async function register(
    email: string, 
    password: string,
    tenantName: string,
    first_name: string,
    last_name : string,
) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/`, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            email,
            password,
            first_name,
            last_name,

            tenant_name : tenantName
        })
    })

    if(!response.ok){
        throw new Error("Signup failedd")
    }

    const data = await response.json()

    return data // Should include : {access, refresh, user: {tenant_slug, ....}}

}


export function setAuthCookies(accessToken: string, refreshToken?: string) {

  const hostname = window.location.hostname  
  const isProduction = process.env.NODE_ENV === 'production'
  const domain = isProduction ? 'novadev.solutions' : undefined
  
  // Set access token
  document.cookie = `access=${accessToken}; path=/; max-age=86400; SameSite=Lax${
    isProduction ? '; Secure' : ''
  }${domain ? `; Domain=${domain}` : ''}`
  
  // Set refresh token
  if (refreshToken) {
    document.cookie = `refresh=${refreshToken}; path=/; max-age=604800; SameSite=Lax${
      isProduction ? '; Secure' : ''
    }${domain ? `; Domain=${domain}` : ''}`
  }
}

export function clearAuthCookies() {
    document.cookie = 'access=; path=/; max-age=0';
    document.cookie = 'refresh=; path=/; max-age=0';
}

