@extends('Layout.app')
@section('title','Project')
@section('content')



    <div id="mainDivProject"
        <div class="row">
            <div class="col-md-12 p-3">
                <button id="addNewProjectBtnId" class="btn my-3 btn-sm btn-primary">Add New </button>
                <table id="ProjectDataTable" class="table table-striped table-bordered" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                        <th class="th-sm">Name</th>
                        <th class="th-sm">Description</th>
                        <th class="th-sm">Edit</th>
                        <th class="th-sm">Delete</th>
                    </tr>
                    </thead>
                    <tbody id="Project_table">

                    </tbody>
                </table>
            </div>
        </div>
    </div>


    <div class="modal fade" id="addProjectModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add New Project</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body  text-center">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <input id="ProjectNameId" type="text" id="" class="form-control mb-3" placeholder="Project Name">
                                <input id="ProjectDesId" type="text" id="" class="form-control mb-3" placeholder="Project Description">
                                <input id="ProjectLinkId" type="text" id="" class="form-control mb-3" placeholder="Project Link">
                                <input id="ProjectImgId" type="text" id="" class="form-control mb-3" placeholder="Project Image">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-primary" data-dismiss="modal">Cancel</button>
                        <button  id="ProjectAddConfirmBtn" type="button" class="btn  btn-sm  btn-danger">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="deleteProjectModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body p-3 text-center">
                    <h5 class="mt-4">Do You Want To Delete?</h5>
                    <h5 id="ProjectDeleteId" class="mt-4 d-none">   </h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-primary" data-dismiss="modal">No</button>
                    <button  id="ProjectDeleteConfirmBtn" type="button" class="btn  btn-sm  btn-danger">Yes</button>
                </div>
            </div>
        </div>
    </div>



    <div class="modal fade" id="updateProjectModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Update Project</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body  text-center">

                    <h5 id="ProjectEditId" class="mt-4 d-none">  </h5>

                    <div id="ProjectEditForm" class="container  d-none">

                        <div class="row">
                            <div class="col-md-12">
                                <input id="ProjectNameUpdateId" type="text" id="" class="form-control mb-3" placeholder="Project Name">
                                <input id="ProjectDesUpdateId" type="text" id="" class="form-control mb-3" placeholder="Project Description">
                                <input id="ProjectLinkUpdateId" type="text" id="" class="form-control mb-3" placeholder="Project Link">
                                <input id="ProjectImgUpdateId" type="text" id="" class="form-control mb-3" placeholder="Project Image">
                            </div>
                        </div>

                        <img id="ProjectEditLoader" class="loading-icon m-5" src="{{asset('images/loader.svg')}}">
                        <h5 id="ProjectEditWrong" class="d-none">Something Went Wrong !</h5>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-primary" data-dismiss="modal">Cancel</button>
                        <button  id="ProjectUpdateConfirmBtn" type="button" class="btn  btn-sm  btn-danger">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>







@endsection


@section('script')

    <script type="text/javascript">

        getProjectData()

    </script>
@endsection
