function getServicesData() {
    axios.get('/getServiceData')

        .then(function(response) {

            $('#serviceDataTable').DataTable().destroy();
            $('#service_table').empty();
            var jsonData = response.data;


            $.each(jsonData, function(i, item) {

                $('<tr>').html(
                    "<td>" + jsonData[i].service_name + "</td>" +
                    "<td><img class='table-img' src=" + jsonData[i].service_img + "></td>" +
                    "<td>" + jsonData[i].service_name + "</td>" +
                    "<td>" + jsonData[i].service_des + "</td>" +
                    "<td><a  class='serviceEditBtn' data-id=" + jsonData[i].id + "><i class='fas fa-edit'></i></a></td>" +
                    "<td><a  class='serviceDeleteBtn'  data-id=" + jsonData[i].id + " ><i class='fas fa-trash-alt'></i></a></td>"
                ).appendTo('#service_table');

            });
            // Services Table Delete Icon Click
            $('.serviceDeleteBtn').click(function() {
                var id = $(this).data('id');
                $('#serviceDeleteId').html(id);
                $('#deleteModal').modal('show');

            })

            $('.serviceEditBtn').click(function() {
                var id = $(this).data('id');
                $('#serviceEditId').html(id);
                ServiceUpdateDetails(id);
                $('#editModal').modal('show');

            })

            $('#serviceDataTable').DataTable({"order":false});
            $('.dataTables_length').addClass('bs-select');

        })
        .catch(function(error) {

        });
}

// Services Delete Modal Yes Btn
$('#serviceDeleteConfirmBtn').click(function() {
    var id = $('#serviceDeleteId').html();
    ServiceDelete(id);
})



// Services Delete
function ServiceDelete(deleteID) {

    $('#serviceDeleteConfirmBtn').html("<div class='spinner-border spinner-border-sm' role='status'></div>") //Animation....

    axios.post('/ServiceDelete', {
        id: deleteID
    })
        .then(function(response) {
            $('#serviceDeleteConfirmBtn').html("Yes");
            if (response.status == 200) {
                if (response.data == 1) {
                    $('#deleteModal').modal('hide');
                    toastr.success('Delete Success');
                    getServicesData();
                } else {
                    $('#deleteModal').modal('hide');
                    toastr.error('Delete Fail');
                    getServicesData();
                }

            } else {
                $('#deleteModal').modal('hide');
                toastr.error('Something Went Wrong !');
            }

        })
        .catch(function(error) {
            $('#deleteModal').modal('hide');
            toastr.error('Something Went Wrong !');
        });
}

// Each Service Update Details
function ServiceUpdateDetails(detailsID) {
    axios.post('/ServiceDetails', {
        id: detailsID
    })
        .then(function(response) {

            if (response.status == 200) {
                $('#serviceEditForm').removeClass('d-none');
                $('#serviceEditLoader').addClass('d-none');

                var jsonData = response.data;
                $('#serviceNameID').val(jsonData[0].service_name);
                $('#serviceDesID').val(jsonData[0].service_des);
                $('#serviceImgID').val(jsonData[0].service_img);
            } else {
                $('#serviceEditLoader').addClass('d-none');
                $('#serviceEditWrong').removeClass('d-none');
            }
        })
        .catch(function(error) {
            $('#serviceEditLoader').addClass('d-none');
            $('#serviceEditWrong').removeClass('d-none');
        });

}



// Services Edit Modal Save Btn
$('#serviceEditConfirmBtn').click(function() {
    var id = $('#serviceEditId').html();
    var name = $('#serviceNameID').val();
    var des = $('#serviceDesID').val();
    var img = $('#serviceImgID').val();
    ServiceUpdate(id, name, des, img);
})

// Each Service Update Details
function ServiceUpdate(serviceID, serviceName, serviceDes, serviceImg) {

    if (serviceName.length == 0) {
        toastr.error('Service Name is Empty !');
    } else if (serviceDes.length == 0) {
        toastr.error('Service Description is Empty !');
    } else if (serviceImg.length == 0) {
        toastr.error('Service Image is Empty !');
    } else {
        $('#serviceEditConfirmBtn').html("<div class='spinner-border spinner-border-sm' role='status'></div>") //Animation....
        axios.post('/ServiceUpdate', {
            id: serviceID,
            name: serviceName,
            des: serviceDes,
            img: serviceImg,

        })
            .then(function(response) {
                $('#serviceEditConfirmBtn').html("Save");

                if (response.status == 200) {

                    if (response.data == 1) {
                        $('#editModal').modal('hide');
                        toastr.success('Update Success');
                        getServicesData();
                    } else {
                        $('#editModal').modal('hide');
                        toastr.error('Update Fail');
                        getServicesData();
                    }
                } else {
                    $('#editModal').modal('hide');
                    toastr.error('Something Went Wrong !');
                }


            })
            .catch(function(error) {
                $('#editModal').modal('hide');
                toastr.error('Something Went Wrong !');
            });

    }

}

// Service Add New btn Click

$('#addNewBtnId').click(function() {
    $('#addModal').modal('show');
});

// Services  Add Modal Save Btn
$('#serviceAddConfirmBtn').click(function() {
    var name = $('#serviceNameAddID').val();
    var des = $('#serviceDesAddID').val();
    var img = $('#serviceImgAddID').val();
    ServiceAdd(name, des, img);
})


// Service Add Method

function ServiceAdd(serviceName, serviceDes, serviceImg) {

    if (serviceName.length == 0) {
        toastr.error('Service Name is Empty !');
    } else if (serviceDes.length == 0) {
        toastr.error('Service Description is Empty !');
    } else if (serviceImg.length == 0) {
        toastr.error('Service Image is Empty !');
    } else {
        $('#serviceAddConfirmBtn').html("<div class='spinner-border spinner-border-sm' role='status'></div>") //Animation....
        axios.post('/ServiceAdd', {
            name: serviceName,
            des: serviceDes,
            img: serviceImg,
        })
            .then(function(response) {
                $('#serviceAddConfirmBtn').html("Save");

                if (response.status == 200) {

                    if (response.data == 1) {
                        $('#addModal').modal('hide');
                        toastr.success('Add Success');
                        getServicesData();
                    } else {
                        $('#addModal').modal('hide');
                        toastr.error('Add Fail');
                        getServicesData();
                    }
                } else {
                    $('#addModal').modal('hide');
                    toastr.error('Something Went Wrong !');
                }

            })
            .catch(function(error) {
                $('#addModal').modal('hide');
                toastr.error('Something Went Wrong !');
            });

    }

}

//end service part.



//For Courses Table
function getCoursesData() {
    axios.get('/getCoursesData')
        .then(function(response) {
            if (response.status == 200) {
                $('#mainDivCourse').removeClass('d-none');
                $('#loaderDivCourse').addClass('d-none');

                $('#courseDataTable').DataTable().destroy();
                $('#course_table').empty();
                var jsonData = response.data;
                $.each(jsonData, function(i, item) {
                    $('<tr>').html(
                        "<td>"+jsonData[i].course_name+"</td>" +
                        "<td>"+jsonData[i].course_fee+"</td>" +
                        "<td>"+jsonData[i].course_totalclass+"</td>" +
                        "<td>"+jsonData[i].course_totalenroll+"</td>" +
                        "<td><a  class='courseDetailBtn' data-id=" + jsonData[i].id + "><i class='fas fa-eye'></i></a></td>" +
                        "<td><a  class='courseEditBtn' data-id=" + jsonData[i].id + "><i class='fas fa-edit'></i></a></td>" +
                        "<td><a  class='courseDeleteBtn'  data-id=" + jsonData[i].id +" ><i class='fas fa-trash-alt'></i></a></td>"

                    ).appendTo('#course_table');
                });
                $('.courseDeleteBtn').click(function(){     //for delete modal show
                    var id= $(this).data('id');
                    $('#CourseDeleteId').html(id);
                    $('#deleteCourseModal').modal('show');
                })

                $('.courseEditBtn').click(function(){            //for delete modal show
                    var id= $(this).data('id');
                    CourseUpdateDetails(id);
                    $('#courseEditId').html(id);
                    $('#updateCourseModal').modal('show');
                })

                $('#courseDataTable').DataTable({"order":false});
                $('.dataTables_length').addClass('bs-select');




            } else {

                $('#loaderDivCourse').addClass('d-none');
                $('#WrongDivCourse').removeClass('d-none');

            }

        })
        .catch(function(error) {
            $('#loaderDivCourse').addClass('d-none');
            $('#WrongDivCourse').removeClass('d-none');
        });

}


// add courses

$('#addNewCourseBtnId').click(function(){
    $('#addCourseModal').modal('show');
});



$('#CourseAddConfirmBtn').click(function(){
    var CourseName=$('#CourseNameId').val();
    var CourseDes=$('#CourseDesId').val();
    var CourseFee=$('#CourseFeeId').val();
    var CourseEnroll=$('#CourseEnrollId').val();
    var CourseClass=$('#CourseClassId').val();
    var CourseLink=$('#CourseLinkId').val();
    var CourseImg=$('#CourseImgId').val();

    CourseAdd(CourseName,CourseDes,CourseFee,CourseEnroll,CourseClass,CourseLink,CourseImg);

})


function CourseAdd(CourseName,CourseDes,CourseFee,CourseEnroll,CourseClass,CourseLink,CourseImg) {

    if(CourseName.length==0){
        toastr.error('Course Name is Empty !');
    }
    else if(CourseDes.length==0){
        toastr.error('Course Description is Empty !');
    }
    else if(CourseFee.length==0){
        toastr.error('Course Fee is Empty !');
    }
    else if(CourseEnroll.length==0){
        toastr.error('Course Enroll is Empty !');
    }
    else if(CourseClass.length==0){
        toastr.error('Course Class is Empty !');
    }
    else if(CourseLink.length==0){
        toastr.error('Course Link is Empty !');
    }
    else if(CourseImg.length==0){
        toastr.error('Course Image is Empty !');
    }

    else{
        $('#CourseAddConfirmBtn').html("<div class='spinner-border spinner-border-sm' role='status'></div>") //Animation....
        axios.post('/CoursesAdd', {
            course_name: CourseName,
            course_des: CourseDes,
            course_fee: CourseFee,
            course_totalenroll: CourseEnroll,
            course_totalclass: CourseClass,
            course_link: CourseLink,
            course_img: CourseImg,

        })
            .then(function(response) {
                $('#CourseAddConfirmBtn').html("Save");

                if(response.status==200){

                    if (response.data == 1) {
                        $('#addCourseModal').modal('hide');
                        toastr.success('Add Success');
                        getCoursesData();
                    } else {
                        $('#addCourseModal').modal('hide');
                        toastr.error('Add Fail');
                        getCoursesData();
                    }
                }
                else{
                    $('#addCourseModal').modal('hide');
                    toastr.error('Something Went Wrong !');
                }

            })
            .catch(function(error) {
                $('#addCourseModal').modal('hide');
                toastr.error('Something Went Wrong !');
            });

    }

}

// Course Delete Confirm
$('#CourseDeleteConfirmBtn').click(function(){
    var id= $('#CourseDeleteId').html();
    CourseDelete(id);
})



// Course Delete
function CourseDelete(deleteID) {
    $('#CourseDeleteConfirmBtn').html("<div class='spinner-border spinner-border-sm' role='status'></div>") //Animation....

    axios.post('/CoursesDelete', {
        id: deleteID
    })
        .then(function(response) {
            $('#CourseDeleteConfirmBtn').html("Yes");
            if(response.status==200){
                if (response.data == 1) {
                    $('#deleteCourseModal').modal('hide');
                    toastr.success('Delete Success');
                    getCoursesData();
                } else {
                    $('#deleteCourseModal').modal('hide');
                    toastr.error('Delete Fail');
                    getCoursesData();
                }

            }
            else{
                $('#deleteCourseModal').modal('hide');
                toastr.error('Something Went Wrong !');
            }

        })
        .catch(function(error) {
            $('#deleteCourseModal').modal('hide');
            toastr.error('Something Went Wrong !');
        });

}


// Course Update

function CourseUpdateDetails(detailsID){
    axios.post('/CoursesDetails', {
        id: detailsID
    })
        .then(function(response) {

            if(response.status==200){
                $('#courseEditForm').removeClass('d-none');
                $('#courseEditLoader').addClass('d-none');
                var jsonData = response.data;
                $('#CourseNameUpdateId').val(jsonData[0].course_name);
                $('#CourseDesUpdateId').val(jsonData[0].course_des);
                $('#CourseFeeUpdateId').val(jsonData[0].course_fee);
                $('#CourseEnrollUpdateId').val(jsonData[0].course_totalenroll);
                $('#CourseClassUpdateId').val(jsonData[0].course_totalclass);
                $('#CourseLinkUpdateId').val(jsonData[0].course_link);
                $('#CourseImgUpdateId').val(jsonData[0].course_img);
            }

            else{
                $('#courseEditLoader').addClass('d-none');
                $('#courseEditWrong').removeClass('d-none');
            }
        })
        .catch(function(error) {
            $('#courseEditLoader').addClass('d-none');
            $('#courseEditWrong').removeClass('d-none');
        });

}

$('#CourseUpdateConfirmBtn').click(function(){
    var courseID=$('#courseEditId').html();
    var  courseName=$('#CourseNameUpdateId').val();
    var  courseDes=$('#CourseDesUpdateId').val();
    var courseFee=$('#CourseFeeUpdateId').val();
    var  courseEnroll=$('#CourseEnrollUpdateId').val();
    var  courseClass=$('#CourseClassUpdateId').val();
    var courseLink=$('#CourseLinkUpdateId').val();
    var  courseImg=$('#CourseImgUpdateId').val();
    CourseUpdate(courseID,courseName,courseDes,courseFee,courseEnroll,courseClass,courseLink,courseImg);
})
function CourseUpdate(courseID,courseName,courseDes,courseFee,courseEnroll,courseClass,courseLink,courseImg) {

    if(courseName.length==0){
        toastr.error('Course Name is Empty !');
    }
    else if(courseDes.length==0){
        toastr.error('Course Description is Empty !');
    }
    else if(courseFee.length==0){
        toastr.error('Course Fee is Empty !');
    }
    else if(courseEnroll.length==0){
        toastr.error('Course Enroll is Empty !');
    }
    else if(courseClass.length==0){
        toastr.error('Course Class is Empty !');
    }
    else if(courseLink.length==0){
        toastr.error('Course Link is Empty !');
    }
    else if(courseImg.length==0){
        toastr.error('Course Image is Empty !');
    }
    else{
        $('#CourseUpdateConfirmBtn').html("<div class='spinner-border spinner-border-sm' role='status'></div>") //Animation....
        axios.post('/CoursesUpdate', {
            id: courseID,
            course_name: courseName,
            course_des: courseDes,
            course_fee: courseFee,
            course_totalenroll: courseEnroll,
            course_totalclass: courseClass,
            course_link: courseLink,
            course_img: courseImg,
        })
            .then(function(response) {
                $('#CourseUpdateConfirmBtn').html("Save");
                if(response.status==200){
                    if (response.data == 1) {
                        $('#updateCourseModal').modal('hide');
                        toastr.success('Update Success');
                        getCoursesData();
                    } else {
                        $('#updateCourseModal').modal('hide');
                        toastr.error('Update Fail');
                        getCoursesData();
                    }
                }
                else{
                    $('#updateCourseModal').modal('hide');
                    toastr.error('Something Went Wrong !');
                }
            })
            .catch(function(error) {
                $('#updateCourseModal').modal('hide');
                toastr.error('Something Went Wrong !');
            });

    }
}


//For project Table
function getProjectData() {
    axios.get('/getProjectData')
        .then(function(response) {
            if (response.status == 200) {
                $('#mainDivProject').removeClass('d-none');
                $('#loaderDivProject').addClass('d-none');

                $('#ProjectDataTable').DataTable().destroy();

                $('#Project_table').empty();
                var jsonData = response.data;
                $.each(jsonData, function(i, item) {
                    $('<tr>').html(
                        "<td>"+jsonData[i].project_name+"</td>" +
                        "<td>"+jsonData[i].project_desc+"</td>" +
                        "<td><a class='ProjectEditBtn' data-id="+jsonData[i].id+"><i class='fas fa-edit'></i></a></td>" +
                        "<td><a class='ProjectDeleteBtn' data-id="+jsonData[i].id+"><i class='fas fa-trash-alt'></i></a></td>"

                    ).appendTo('#Project_table');
                });

                $('.ProjectDeleteBtn').click(function(){

                    var id= $(this).data('id');
                    $('#ProjectDeleteId').html(id);
                    $('#deleteProjectModal').modal('show');
                })


                $('.ProjectEditBtn').click(function(){
                    var id= $(this).data('id');
                    ProjectUpdateDetails(id);
                    $('#ProjectEditId').html(id);
                    $('#updateProjectModal').modal('show');
                })


                $('#ProjectDataTable').DataTable({"order":false});
                $('.dataTables_length').addClass('bs-select');



            } else {

                $('#loaderDivProject').addClass('d-none');
                $('#WrongDivProject').removeClass('d-none');

            }

        })
        .catch(function(error) {
            $('#loaderDivProject').addClass('d-none');
            $('#WrongDivProject').removeClass('d-none');
        });

}

//Add project


$('#addNewProjectBtnId').click(function(){
    $('#addProjectModal').modal('show');
});

$('#ProjectAddConfirmBtn').click(function(){
    var ProjectName=$('#ProjectNameId').val();
    var ProjectDes=$('#ProjectDesId').val();
    var ProjectLink=$('#ProjectLinkId').val();
    var ProjectImg=$('#ProjectImgId').val();
    ProjectAdd(ProjectName,ProjectDes,ProjectLink,ProjectImg);

})

function ProjectAdd(ProjectName,ProjectDes,ProjectLink,ProjectImg) {

    if(ProjectName.length==0){
        toastr.error('Project Name is Empty !');
    }
    else if(ProjectDes.length==0){
        toastr.error('Project Description is Empty !');
    }
    else if(ProjectLink.length==0){
        toastr.error('Project Link is Empty !');
    }
    else if(ProjectImg.length==0){
        toastr.error('Project Image is Empty !');
    }

    else{
        $('#ProjectAddConfirmBtn').html("<div class='spinner-border spinner-border-sm' role='status'></div>") //Animation....
        axios.post('/ProjectAdd', {
            project_name: ProjectName,
            project_desc: ProjectDes,
            project_link: ProjectLink,
            project_img: ProjectImg,

        })
            .then(function(response) {
                $('#ProjectAddConfirmBtn').html("Save");

                if(response.status==200){

                    if (response.data == 1) {
                        $('#addProjectModal').modal('hide');
                        toastr.success('Add Success');
                        getProjectData();
                    } else {
                        $('#addProjectModal').modal('hide');
                        toastr.error('Add Fail');
                        getProjectData();
                    }
                }
                else{
                    $('#addProjectModal').modal('hide');
                    toastr.error('Something Went Wrong !');
                }

            })
            .catch(function(error) {
                $('#addProjectModal').modal('hide');
                toastr.error('Something Went Wrong !');
            });

    }

}

// Project Delete Confirm
$('#ProjectDeleteConfirmBtn').click(function(){
    var id= $('#ProjectDeleteId').html();
    ProjectDelete(id);
})



// Project Delete
function ProjectDelete(deleteID) {
    $('#ProjectDeleteConfirmBtn').html("<div class='spinner-border spinner-border-sm' role='status'></div>") //Animation....
    axios.post('/ProjectDelete', {
        id: deleteID
    })
        .then(function(response) {
            $('#ProjectDeleteConfirmBtn').html("Yes");
            if(response.status==200){
                if (response.data == 1) {
                    $('#deleteProjectModal').modal('hide');
                    toastr.success('Delete Success');
                    getProjectData();
                } else {
                    $('#deleteProjectModal').modal('hide');
                    toastr.error('Delete Fail');
                    getProjectData();
                }

            }
            else{
                $('#ProjectDeleteConfirmBtn').html("Yes");
                $('#deleteProjectModal').modal('hide');
                toastr.error('Something Went Wrong !');
            }

        })
        .catch(function(error) {
            $('#ProjectDeleteConfirmBtn').html("Yes");
            $('#deleteProjectModal').modal('hide');
            toastr.error('Something Went Wrong !');
        });

}


// Project Update

function ProjectUpdateDetails(detailsID){
    axios.post('/ProjectDetails', {
        id: detailsID
    })
        .then(function(response) {

            if(response.status==200){
                $('#ProjectEditForm').removeClass('d-none');
                $('#ProjectEditLoader').addClass('d-none');
                var jsonData = response.data;
                $('#ProjectNameUpdateId').val(jsonData[0].project_name);
                $('#ProjectDesUpdateId').val(jsonData[0].project_desc);
                $('#ProjectLinkUpdateId').val(jsonData[0].project_link);
                $('#ProjectImgUpdateId').val(jsonData[0].project_img);
            }

            else{
                $('#ProjectEditLoader').addClass('d-none');
                $('#ProjectEditWrong').removeClass('d-none');
            }
        })
        .catch(function(error) {
            $('#ProjectEditLoader').addClass('d-none');
            $('#ProjectEditWrong').removeClass('d-none');
        });

}

$('#ProjectUpdateConfirmBtn').click(function(){
    var ProjectID=$('#ProjectEditId').html();
    var  ProjectName=$('#ProjectNameUpdateId').val();
    var  ProjectDes=$('#ProjectDesUpdateId').val();
    var ProjectLink=$('#ProjectLinkUpdateId').val();
    var  ProjectImg=$('#ProjectImgUpdateId').val();
    ProjectUpdate(ProjectID,ProjectName,ProjectDes,ProjectLink,ProjectImg);
})




function ProjectUpdate(ProjectID,ProjectName,ProjectDes,ProjectLink,ProjectImg) {

    if(ProjectName.length==0){
        toastr.error('Project Name is Empty !');
    }
    else if(ProjectDes.length==0){
        toastr.error('Project Description is Empty !');
    }
    else if(ProjectLink.length==0){
        toastr.error('Project Link is Empty !');
    }
    else if(ProjectImg.length==0){
        toastr.error('Project Image is Empty !');
    }
    else{
        $('#ProjectUpdateConfirmBtn').html("<div class='spinner-border spinner-border-sm' role='status'></div>") //Animation....
        axios.post('/ProjectUpdate', {
            id: ProjectID,
            project_name:ProjectName,
            project_desc:ProjectDes,
            project_link:ProjectLink,
            project_img:ProjectImg,
        })
            .then(function(response) {
                $('#ProjectUpdateConfirmBtn').html("Save");
                if(response.status==200){
                    if (response.data == 1) {
                        $('#updateProjectModal').modal('hide');
                        toastr.success('Update Success');
                        getProjectData();
                    } else {
                        $('#updateProjectModal').modal('hide');
                        toastr.error('Update Fail');
                        getProjectData();
                    }
                }
                else{
                    $('#updateProjectModal').modal('hide');
                    toastr.error('Something Went Wrong !');
                }
            })
            .catch(function(error) {
                $('#updateProjectModal').modal('hide');
                toastr.error('Something Went Wrong !');
            });

    }
}






