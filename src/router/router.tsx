import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TableContainer from "../components/Table/TableContainer";
import { BookingCreator } from "../components/BookingCreator/BookingCreator";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <TableContainer />,
            },

            {
                path: '/newbooking',
                element: <BookingCreator />
            },

        ],
    },
])


