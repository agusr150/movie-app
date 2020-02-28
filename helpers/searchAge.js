const searchAge = (birthyear, released_year) => {
    return Number(released_year) - Number(birthyear)
}

module.exports = searchAge