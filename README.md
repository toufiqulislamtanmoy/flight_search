## Flight Search App: Airport Autocompletion and Global State Management

This project showcases a flight search application with a key focus on **airport autocompletion** and **efficient global state management**. It's designed to provide a smooth user experience by offering relevant airport suggestions as the user types, while ensuring all search criteria are consistently tracked within a global store. 

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

**3. Search Functionality:**

   - The application includes a "Search" button that triggers the search handler when clicked.
   - The search handler gathers all the search parameters from the global state and logs them to the console.

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
        - **ui:**
            - `button.jsx`: Button component.
            - `command.jsx`: Command component (used within ComboBox).
            - `dialog.jsx`: Dialog component.
            - `popover.jsx`: Popover component (used within ComboBox and DatePickerDemo).
            - `select.jsx`: Select component (used within SelectDropDown).
            - `input.jsx`: Input component (used within DialogDemo).
            - `label.jsx`: Label component (used within DialogDemo).
            - `calendar.jsx`: Calendar component (used within DatePickerDemo).
    - **assets:** Contains media files:
        - `bg_video.mp4`: Background video for the app.
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
