
var service_Rating = 5
var cleanliness_Rating = 5
var food_Quality_Rating = 5
var feedback = []
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    renderRating()
}
function insertData() {
    if (validation()) {
        var ReporterName = document.getElementById("reporter_name").value
        var RestaurantName = document.getElementById("restaurant_Name").value
        var RestaurantType = document.getElementById("restaurant_Type").value
        var VisitDate = document.getElementById("time_visit").value
        var AvarageMealPrice = document.getElementById("price").value
        var ServiceRating = service_Rating
        var CleanlinessRating = cleanliness_Rating
        var FoodQualityRating = food_Quality_Rating
        var Notes = document.getElementById("note").value

        feedback = [RestaurantName, RestaurantType, VisitDate, AvarageMealPrice,
            ServiceRating, CleanlinessRating, FoodQualityRating, Notes, ReporterName, user.email]

        document.getElementById("Add_Feedback").setAttribute("data-toggle", "modal");
        document.getElementById("Add_Feedback").setAttribute("data-target", "#exampleModal");
        document.getElementById("addConfirm").innerHTML = `
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-center" id="exampleModalLabel">Response by `+ ReporterName + `</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <table class="table table-borderless">
                                <tbody>
                                    <tr>
                                        <th scope="row">Restaurant Name</th>
                                        <td>`+ RestaurantName + `</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Restaurant type</th>
                                        <td>`+ RestaurantType + `</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Date and time of the visit</th>
                                        <td>`+ VisitDate + `</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Average meal price per person</th>
                                        <td>`+ AvarageMealPrice + `</td>
                                    </tr>
                                    <tr>    
                                        <th scope="row">Service rating</th>
                                        <td>`+ ServiceRating + ` <i class="fa fa-star" style="font-size:20px;color:#0099FF"></i></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Cleanliness rating</th>
                                        <td>`+ cleanliness_Rating + ` <i class="fa fa-star" style="font-size:20px;color:#0099FF"></i></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Food quality rating</th>
                                        <td>`+ CleanlinessRating + ` <i class="fa fa-star" style="font-size:20px;color:#0099FF"></i></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Notes</th>
                                        <td>`+ Notes + `</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onclick="confirmData()" type="button" class="btn btn-primary">Add Feedback</button>
                        </div>
                    </div>
                </div>
            </div>`
    }
}
function insertFeedback(tx) {
    var executeQuery = `INSERT INTO iRate (RestaurantName, RestaurantType, VisitDate, AvarageMealPrice, 
         ServiceRating, CleanlinessRating, FoodQualityRating, Notes, ReporterName, Email) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    tx.executeSql(executeQuery, feedback)
}
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}
function successCB() {
    window.location.href = "Home.html"
}
function renderServiceStar() {
    let star = ''
    for (let i = 1; i <= 5; i++) {
        if (i <= service_Rating) {
            star += `<i onclick="setServiceRating(` + i + `)" class="fa fa-star" style="font-size:xx-large;color:#0099FF"></i>`
        } else {
            star += `<i onclick="setServiceRating(` + i + `)" class="fa fa-star-o" style="font-size:x-large;color:#0099FF"></i>`
        }
    }
    return star
}
function renderCleanlinessStar() {
    let star = ''
    for (let i = 1; i <= 5; i++) {
        if (i <= cleanliness_Rating) {
            star += `<i onclick="setCleanlinessRating(` + i + `)" class="fa fa-star" style="font-size:xx-large;color:#0099FF"></i>`
        } else {
            star += `<i onclick="setCleanlinessRating(` + i + `)" class="fa fa-star-o" style="font-size:x-large;color:#0099FF"></i>`
        }
    }
    return star
}
function renderFoodQualityStar() {
    let star = ''
    for (let i = 1; i <= 5; i++) {
        if (i <= food_Quality_Rating) {
            star += `<i onclick="setFoodQualityRating(` + i + `)" class="fa fa-star" style="font-size:xx-large;color:#0099FF"></i>`
        } else {
            star += `<i onclick="setFoodQualityRating(` + i + `)" class="fa fa-star-o" style="font-size:x-large;color:#0099FF"></i>`
        }
    }
    return star
}
function setServiceRating(i) {
    service_Rating = i
    renderRating()
}
function setCleanlinessRating(i) {
    cleanliness_Rating = i
    renderRating()
}
function setFoodQualityRating(i) {
    food_Quality_Rating = i
    renderRating()
}
function renderRating() {
    document.getElementById("renderStar").innerHTML = `
        <div class="row">
            <p class="col-6">Food Quality Rating:</p>
            <div class="col-6">
                <p>`+ renderServiceStar() + `</p>
            </div>
        </div>
        <div class="row">
            <p class="col-6">Cleanliness Rating:</p>
            <div class="col-6">
                <p>`+ renderCleanlinessStar() + `</p>
            </div>
        </div>
        <div class="row">
            <p class="col-6">Service Rating:</p>
            <div class="col-6">
                <p>`+ renderFoodQualityStar() + `</p>
            </div>
        </div>`
}
function validation() {
    let date = format(document.getElementById("time_visit").value)
    if (validateString("reporter_name") == false || validateString("restaurant_Name") == false ||
        validateString("restaurant_Type") == false || validatedate(date) == false || validateMoney("price") == false) {
        alert("Invalid input fields!")
        return false
    } else return true
}
function validatedate(date) {
    var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    if (date.match(dateformat)) {
        var opera = date.split('/');
        lopera1 = opera.length;
        if (lopera1 > 1) {
            var pdate = date.split('/');
        }
        var mm = parseInt(pdate[0]);
        var dd = parseInt(pdate[1]);
        var yy = parseInt(pdate[2]);
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {
                return false;
            }
        }
        if (mm == 2) {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }
            if ((lyear == false) && (dd >= 29)) {
                return false;
            }
            if ((lyear == true) && (dd > 29)) {
                return false;
            }
        }
    }
    else {
        document.getElementById("time_visit").classList.add("border-danger");
        return false;
    }
}
function format(inputDate) {
    if (inputDate.length == 0) return ""
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }
}
function validateString(id) {
    let str = document.getElementById(id).value
    if (str.length == 0) {
        document.getElementById(id).classList.add("border-danger");
        return false;
    }
    var letters = /[A-Za-z ]/;
    if (str.match(letters)) {
        document.getElementById(id).classList.remove("border-danger");
        return true
    }
    else {
        document.getElementById(id).classList.add("border-danger");
        return false;
    }
}
function validateMoney(id) {
    var money = document.getElementById(id).value
    var moneyformat = /[0-9]./
    if (money.length == 0) {
        document.getElementById(id).classList.add("border-danger");
        return false;
    }
    if (money.match(moneyformat)) {
        document.getElementById(id).classList.remove("border-danger");
        return true
    }
    else {
        document.getElementById(id).classList.add("border-danger");
        return false;
    }
}
function confirmData() {
    var r = confirm("Do you want to sent feedback?");
    if (r == true) {
        db.transaction(insertFeedback, errorCB, successCB)
    }
}
function deleteData() {
    db.transaction(deleteSQL, errorCB, successCB);
}
function deleteSQL(tx) {
    tx.executeSql("delete from iRate")
}
