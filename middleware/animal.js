export default function ({ store, redirect }) {
  // If the animal is not setted
  if (!store.state.animal) {
    return redirect('/welcome')
  }
}

