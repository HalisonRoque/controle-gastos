import { useRoutes } from "react-router-dom";
import { homeRoutes } from "../home/index";
import { categoryRoutes } from "../category";
import { personRoutes } from "../person";
import { transactionRoutes } from "../transaction";
// depois você adiciona outras

const AppRoutes = () => {
    return useRoutes([
        ...homeRoutes,
        ...categoryRoutes,
        ...personRoutes,
        ...transactionRoutes,
    ]);
};

export default AppRoutes;