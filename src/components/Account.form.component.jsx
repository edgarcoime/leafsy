import React from "react";

function ProfileForm() {
  return (
    <div>
      <form>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Email
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="staticEmail"
              value="email@example.com"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="businessAddress" class="col-sm-2 col-form-label">
            Password
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="businessAddress"
              placeholder="Business Address"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
