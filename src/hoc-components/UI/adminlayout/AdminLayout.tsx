import React from "react";

const AdminLayout = (WrappedComponent) => {
  function NewComponent() {
    return (
      <div className="container-fluid d-flex flex-row row h-100 m-0 p-0 overflow-auto">
        <div className="col-md-12 d-flex flex-column p-0">
          <div className="h-100">
            <WrappedComponent />
          </div>
        </div>
      </div>
    );
  }
  return NewComponent;
};

export default AdminLayout;
