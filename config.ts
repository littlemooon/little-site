const config = {
  dev: process.env.NODE_ENV === 'development',
  api: {
    url: process.env.API_URL,
    token: process.env.API_TOKEN,
  },
}

export default config
