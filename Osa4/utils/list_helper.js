const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    let sum = 0
    for (const blog of blogs) {
        sum += blog.likes
    }
    return Array.length === 0 ? 0 : sum
}


const favoriteBlog = (blogs) => {
    let biggest = 0;
    let favouriteBlog = blogs[0];
    for (const blog of blogs) {
        if (blog.likes > biggest) {
            favouriteBlog = blog 
            biggest = blog.likes
        }
    }
    console.log(favouriteBlog)
    return favouriteBlog
}
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }