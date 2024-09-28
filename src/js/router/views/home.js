import { authGuard } from "../../utilities/authGuard";
import { fetchAllPosts } from '../../ui/global/showPosts.js';
import { showMakePostButton } from "../../ui/global/makePostButton.js";
const accessToken = localStorage.getItem('token');


authGuard();
fetchAllPosts();

if (accessToken) {
  showMakePostButton();
}








