import { authGuard } from "../../utilities/authGuard";
import { fetchAllPosts } from '../../ui/global/showPosts.js';


authGuard();
fetchAllPosts();








