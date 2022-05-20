const Weather = function (data) {
    this.data = data
    this.errors = []
}


Weather.prototype.validateUserInput = function () {
    if (this.data == "") {
        this.errors.push("Enter a name of a city ")
    }

}


module.exports = Weather