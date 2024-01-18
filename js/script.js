function getData() {
  $(".spinner-border").show();
  var htmlContent = "";
  $.post({
    url: "https://ccee.cloud/user/login",
    data: { email: "aniketkadu765@gmail.com", password: "Aniket1996@" },
    success: (data) => {
      var AuthToken = data.authtoken;
      $.get({
        url: "https://ccee.cloud/user/",
        headers: { Authorization: AuthToken },
        success: (data) => {
          var itemsProcessed = 0;
          data.allUsers.forEach((element) => {
            htmlContent += `<tr>
                                <td>${
                                  element.firstName + " " + element.lastName
                                }</td>
                                <td>${element.email}</td>
                                <td>${
                                  element.paymentStatus
                                    ? `<span style="color : darkgreen;">true</span>`
                                    : `<span style="color : red;">false</span>` +
                                      `<button id=${element._id} class="btn btn-primary float-end" onclick="update(this.id)">Make true</button>`
                                }</td>
                                <td>${
                                  element.expired
                                    ? `<span style="color : darkgreen;">true</span>` +
                                      `<button id=${element._id} class="btn btn-primary float-end" onclick="update(this.id)">Make false</button>`
                                    : `<span style="color : red;">false</span>`
                                }</td>
                                <td>${new Date(element.createdAt)
                                  .toJSON()
                                  .slice(0, 10)}</td>
                                <td>${new Date(element.updatedAt)
                                  .toJSON()
                                  .slice(0, 10)}</td> 
                            </tr>`;
            itemsProcessed++;
            if (itemsProcessed === data.allUsers.length) {
              callback(htmlContent);
            }
          });
        },
        error: (data) => {
          $("#result").text(data.responseJSON.error);
        },
      });
    },
  });
}

function callback(htmlContent) {
  $("tbody").html(htmlContent);
  $("#example").DataTable({
    // //disable sorting on last column
    // columnDefs: [{ orderable: false, targets: 5 }],
    language: {
      //customize pagination prev and next buttons: use arrows instead of words
      paginate: {
        previous: '<span class="fa fa-chevron-left"></span>',
        next: '<span class="fa fa-chevron-right"></span>',
      },
      //customize number of elements to be displayed
      lengthMenu:
        'Display <select class="form-control input-sm">' +
        '<option value="10">10</option>' +
        '<option value="20">20</option>' +
        '<option value="30">30</option>' +
        '<option value="40">40</option>' +
        '<option value="50">50</option>' +
        '<option value="-1">All</option>' +
        "</select> results",
    },
  });
  $("#example").show();
  $(".spinner-border").hide();
}

function update(id) {
  $.post({
    url: `https://ccee.cloud/user/paymentstatusupdate/${id}`,
    success: (data) => {
      $("#result").text(data.message);
    },
    error: (data) => {
      console.log(data);
    },
  });
}
