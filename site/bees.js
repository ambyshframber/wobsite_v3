const bees = [
  "beetles. There are three different families of beetle that make their home in the wildflower meadows of the Southwest, and these little bastards have stings. You may say these little guys don't harm you, but you'd be wrong. They can bite through clothing, leather, and plastic. It's not uncommon to see a beekeeper or someone out picking bees (gathering nectar) get stung multiple times by an enraged beetle.",
  "the genus Apis. All the common species, all you hear about are honey bees (though some do sting, and even bees in the larger genus Bombus will do that, but most people won't worry about it).\nBeekeeping is actually quite small. There are a few hundred commercial beekeepers worldwide. Many keep a very small number of hives - most people keep 5-10, with many people having 2-5 at most. Commercial beekeepers aren't really that concerned with what a hobbyist considers to be \"bee health\". The one thing that they DO tend to concern themselves about is the use of synthetic chemicals (such as neonicotinoids and pyrethroids) to control bees, because these are used in most every pesticide for which bees are commonly used as a control organism. Bees, as far as I'm aware, do not even use these chemicals, as they are not necessary to keep a healthy colony.",
  "ants.\nYou can tell by the size, speed, and smell that these ants are not bees.",
  "just like all life, an organism of billions. And just like all life it's an organism which is striving to survive and thrive. And by saying you \"need to have\" bees for your garden, it's like saying you \"need\" the bacteria in our intestine to survive - or that we \"need\" our own species - I think we have some rethinking to do about our own position within the universe and the place that we're in.",
  "a wasp. The word is from the same root as bee, but has a different spelling. The difference between wasp and bee is that the wasp has a \"sting\" while the bee does not. It's true that people are allergic to wasps, however, the venom has nothing to do with bees. Wasps are not true insects, they are insects, and so are bees. Bees and wasps look similar, but their life styles are different. Wasps do not live in \"hives\" like bees. Bees tend to nest in trees, and wasps tend to nest in cavities. Bees only work for a hive. Wasps do not." ]
  
function get_bee_text() {
  let entry = Math.floor(Math.random() * bees.length)
  return "I'd just like to interject for a moment. What you're referring to as bees, is in fact, " + bees[entry]
}

document.getElementById("bees").innerHTML = get_bee_text()
