## Flight Search App: Airport Autocompletion and Global State Management

This project is a flight search application designed to make finding flights faster and more convenient for users. It leverages **smart airport autocompletion**, allowing users to quickly select their desired departure and destination airports with **dynamic suggestions**.  A **global state management** system ensures all search parameters are consistently stored and accessible across the application, leading to a seamless and robust experience. To enhance usability, the search results are dynamically displayed in batches of ten, with **"Show More"** and **"Show Less"** buttons providing control over the displayed results. The project prioritizes a user-friendly interface and a comprehensive approach to flight search. 


Here's a breakdown of the project's key features:

**1. Airport Autocompletion:**

   - The application features a ComboBox component that allows users to input their desired departure and destination airports. 
   - It fetches airport data from an external API (using the `fetchAirports` function) and dynamically suggests matching airport options as the user types. 
   - To enhance performance and user experience, the component initially displays only the top 3 suggestions, with a search functionality to refine the list further. 
   - The selected airport information is seamlessly stored in the global state.

**2. Global State Management:**

   - The project utilizes the `pullstate` package to manage the global state of the application. 
   - This global store holds all the necessary information for flight searches, including:
      - Selected departure and destination airports.
      - Departure and return dates.
      - Trip type (one-way or round trip).
      - Flight type (any, direct, connecting).
      - Traveler details (adults, children, infants).
      - Booking class and baggage options.
      - Loading status of airport data.

Okay, here's the updated markdown without code:

**3. Search Functionality:**

The application includes a "Search" button that triggers the search handler when clicked.  After the user fills in all necessary information, clicking the "Search" button will:

1. **Retrieve Search Parameters:** The search handler gathers all the search parameters from the global state. 
2. **Redirect to `/flight/search` Route:** The user is then redirected to the `/flight/search` route.
3. **Display Search Results:** On the `/flight/search` page:
    - If flight results are found, they will be displayed.
    - If no results are found, a message like "No flights found" will be shown.

**4. Show More/Show Less Functionality on Flight Search Results Page:**

- **Initial Display:** When the search results page loads, it will initially display only the 10 results.
- **"Show More" Button:** If there are more results than 10, a "Show More" button will be visible. 
- **"Show More" Click:** When the user clicks "Show More":
   - The next 10 results will be added to the displayed list.
   - The "Show More" button will remain active until all results are displayed. 
- **"Show Less" Button:** When all results are displayed, the "Show More" button will be replaced with a "Show Less" button.
- **"Show Less" Click:** When the user clicks "Show Less":
   - The display will be reset to show only the first 10 results.
   - The "Show More" button will reappear if there are more results than 10.

**The project aims to demonstrate the following:**

   - **Efficient airport autocompletion:**  Provides a user-friendly experience for selecting airports.
   - **Centralized global state:**  Ensures all application data is consistently stored and accessible across different components.
   - **Foundation for flight search:**  Provides a robust framework for building a complete flight search application by seamlessly integrating with a backend API. 

By combining airport autocompletion with a well-organized global store, this project sets the stage for a powerful flight search application.

### Project Structure

The project is structured as follows:

- **src:**
    - **components:** Contains reusable components for UI elements:
        - **custom:**
            - `ComboBox.jsx`: Airport Autocompletion component.
            - `DatePickerDemo.jsx`: Date Picker component.
            - `DialogDemo.jsx`: Dialog component for traveler details input.
            - `SelectDropDown.jsx`: Dropdown component for trip type, flight type, booking class, and baggage options.
            - **Card**: Display Flight Card
               - `FlightCard.jsx`: Reuseable Custom Component to render flight information as card
            - **Skeleton**: Display Loader Skeleton when data is filterd
               - `ListSkeleton.jsx`: Display Loader Skeleton when data is filterd
        - **ui:**
            - `button.jsx`: Button component.
            - `command.jsx`: Command component (used within ComboBox).
            - `dialog.jsx`: Dialog component.
            - `popover.jsx`: Popover component (used within ComboBox and DatePickerDemo).
            - `select.jsx`: Select component (used within SelectDropDown).
            - `input.jsx`: Input component (used within DialogDemo).
            - `label.jsx`: Label component (used within DialogDemo).
            - `calendar.jsx`: Calendar component (used within DatePickerDemo).
         
    - **data:** Contains flights `json` data
        - `flight_search_result.json`: Flights data for searching  
    - **pages:** Contains all the pages
        - `FlightSearch.jsx`: Display search result page 
    - **assets:** Contains media files:
        - `bg_video.mp4`: Background video for the app.
    - **utilits:** Contains all the helper functions and drop-down options:
        - `flightSearch.js`: The flightSearch function is used to filter flights.
        - `selectDropDownOptions.js`: Here have all the necessary drop-down options.
    - **store:** Contains global store management:
        - `store.jsx`: FlightStore object and `fetchAirports` function.
    - **App.jsx:** Main application component.

### Technologies Used

- **React:** Frontend library.
- **pullstate:** Package for managing global state.
- **Date-fns:** Library for date formatting.
- **SHADCN UI:** Library for accessible UI components.
- **Tailwind CSS:** CSS framework.
- **React Icons:** Library for icons.

### How to Run the Project

1. **Clone the repository:** `git clone https://github.com/toufiqulislamtanmoy/flight_search.git`
2. **Install dependencies:** `npm install`
3. **Start the development server:** `npm run dev`

This README provides a comprehensive overview of the Flight Search App project. Please feel free to modify and enhance it based on your specific needs.

---------
You can see the live project at [https://flight-search-easy.netlify.app/](https://flight-search-easy.netlify.app/)
