import { getWalkers } from "./database.js"
import { getWalkerCities } from "./database.js"
import { getCities } from "./database.js"

document.addEventListener(
    "click",  // This is the type of event
    (clickEvent) => {
        /*
            The target of a click event is the most specific HTML element
            that was clicked by the user.
        */
        const itemClicked = clickEvent.target

        /*
            Only run the rest of the logic if a walker <li> was clicked
        */
        if (itemClicked.id.startsWith("walker")) {

            /*
                Extract the primary key from the id attribute of the list
                item that you clicked on. Refer back to the code you
                wrote for each list item. Note the format of the id
                attribute ("walker--2" if you clicked on the second one).

                This code splits that string apart into an array, and
                captures the "2" and assigns it to be the value of the
                `walkerId` variable.

                Splitting a string in JavaScript:
                    https://www.youtube.com/watch?v=u2ZocmM93yU

                Destructuring in JavaScript:
                    https://www.youtube.com/watch?v=UgEaJBz3bjY
            */
            const [,walkerId] = itemClicked.id.split("--")

            /*
                Now that you have the primary key of a walker object,
                find the whole object by iterating the walkers array.
            */
            for (const walker of walkers) {

                /*
                    Compare the primary key of each walker to the one
                    you have. As soon as you find the right one, display
                    the window alert message.
                */
                if (walker.id === parseInt(walkerId)) {
                    const walkerLocales = getMatchingCities(walker)
                    const cityString = matchingCitiesString(walkerLocales)
                    window.alert(`${walker.name} services ${cityString}`)

                    console.log(cityString)
                }
            }
        }
    }
)

const walkers = getWalkers()
const walkerCities = getWalkerCities()
const cities = getCities()


export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        //walkerHTML += `<li>${walker.name}</li>`
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"

    return walkerHTML
}


/* 
    Define a function that will get all objects in walkerCities array that are for clicked walker
        Return an array of all matching objects
*/
export const getMatchingCities = (clickedWalker) => {
    //Define an array for matching cities
    const matchingCities = []

    //Iterate through walkerCities for matching walkerID
    for (const city of walkerCities) {
        if (city.walkerId === clickedWalker.id) {
            matchingCities.push(city)
        }
    }

    return matchingCities
}

/* 
    Define a function that takes in the array of matching objects and use the cityId property on each
    one to the find the matching city name
        Return a string containing all the city names
*/
export const matchingCitiesString = (matchingCities) => {
    //Define an empty string for matching cities
    let cityString = ""

    //Iterate through matchingCities
    for (const walkerCity of matchingCities) {
        //Iterate through cities array
        for (const city of cities) {
            //If walkerCity.cityId === city.id, then add city.name to cityString
            if (walkerCity.cityId === city.id) {
                //Checking for if walker services two cities and formats string accordingly
                if (cityString !== "") {
                    cityString = `${cityString} and ${city.name}`
                }
                else {
                    cityString = `${city.name}`
                }
                
            }
        }
    }

    return cityString
}