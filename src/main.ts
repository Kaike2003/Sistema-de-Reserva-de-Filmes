import ApiExpress from "./api/express/express";
import UserAdminController from "./controller/user/admin/user.admin.controller";

function main() {
  const api = ApiExpress.build();
  const userAdmin = UserAdminController.build();
  const adminUrl = "/admin-";

  api.postAdd(adminUrl + "create", userAdmin.create);
  api.putAdd(adminUrl + "authenticate", userAdmin.authenticate);
  api.putAdd(adminUrl + "update-data/:username", userAdmin.updateData as any);
  api.putAdd(
    adminUrl + "update-username/:email",
    userAdmin.updateUsername as any
  );
  api.putAdd(
    adminUrl + "update-password/:username",
    userAdmin.updatePassword as any
  );
  api.putAdd(adminUrl + "update-email/:username", userAdmin.updateEmail as any);

  api.getRoutes();
  api.start(8888);
}

main();
