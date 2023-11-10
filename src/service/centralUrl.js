export const API_URLS = {
  composeNew: {
      endpoint: "api/compose",
      method: "POST",
  },
  getInboxMsg: {
      endpoint: "api/inbox",
      method: "GET",
  },
  getOutboxMsg:{
      endpoint: "api/outbox",
      method: "GET",
  },
  markStarredMsg:{
      endpoint: "api/starred",
      method: "POST",
  },
  getStarredMsg:{
      endpoint: "api/starred",
      method: "GET",
  },
  markImportantMsg:{
      endpoint: "api/imp",
      method: "POST",
  },
  getImportantMsg:{
      endpoint: "api/imp",
      method: "GET",
  },
  deleteMsg: {
      endpoint: "api/delete",
      method: "DELETE",
  },
  saveDraftMsg: {
      endpoint: "api/CreateDraft",
      method: "POST",
  },
  getDraftMsg:{
      endpoint: "api/GetDraft",
      method: "GET",
  },
  getTrashMsg:{
      endpoint: "api/trash",
      method: "GET",
  },
  uploadFiles:{
      endpoint: "api/upload",
      method: "POST",
  },
  createUser:{
      endpoint:"api/register",
      method:"POST",
  },
  userLogin:{
      endpoint:"api/login",
      method:"POST",
  },
  forgetPass:{
    endpoint:"api/forget",
    method:"POST",
  },
  resetPass:{
    endpoint:"api/reset",
    method:"POST",
  },
};
