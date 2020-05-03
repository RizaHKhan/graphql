const message = 'Some message from myModule.js';
const name = 'khanr'
const location = 'Ottawa'

const getGreeting = (name) => {
  return `Welcome to the course ${name}`
}

export { message, getGreeting, name, location as default };
