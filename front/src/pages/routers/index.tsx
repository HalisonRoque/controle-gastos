import { useRoutes } from "react-router-dom";
import { homeRoutes } from "../home/index";
import { categoryRoutes } from "../category";
import { personRoutes } from "../person";
import { transactionRoutes } from "../transaction";
import { balanceRoutes } from "../balance";
import { categoryBalanceRoutes } from "../balanceCategory";

/*Criando AppRoutes para acessar os componentes das telas do sistema*/

const AppRoutes = () => {
    return useRoutes([
        ...homeRoutes,
        ...categoryRoutes,
        ...personRoutes,
        ...transactionRoutes,
        ...balanceRoutes,
        ...categoryBalanceRoutes,
    ]);
};

export default AppRoutes;