package hac.repo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/registration")
public class RegistrationController {

    @Autowired
    private RegistrationRepository registrationRepository;

    /**
     * Retrieves the registration summary based on optional filter parameters (start date, end date, city).
     * @param startDate Start date filter parameter (optional)
     * @param endDate End date filter parameter (optional)
     * @param city City filter parameter (optional)
     * @return List of registrations that match the filter criteria
     */
    @GetMapping("/summary")
    public List<Registration> getRegistrationSummary(
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate,
            @RequestParam(required = false) String city
    ) {
        if (startDate != null && endDate != null) {
            if (city != null && !city.isEmpty()) {
                return registrationRepository.findByBirthDateBetweenAndCity(startDate, endDate, city);
            } else {
                return registrationRepository.findByBirthDateBetween(startDate, endDate);
            }
        } else if (city != null && !city.isEmpty()) {
            return registrationRepository.findByCity(city);
        } else {
            return registrationRepository.findAll();
        }
    }

    /**
     * Creates a new registration entry.
     * @param registration Registration object to be created
     * @return ResponseEntity with the created registration object and HTTP status code
     */
    @PostMapping
    public ResponseEntity<Registration> createRegistration(@RequestBody Registration registration) {
        try {
            String firstName = registration.getFirstName();
            String lastName = registration.getLastName();
            LocalDate birthDate = registration.getBirthDate();
            String address = registration.getAddress();
            String country = registration.getSelectedCountry();
            String city = registration.getCity();
            String zipCode = registration.getZipCode();
            String landLine = registration.getLandLine();
            String cellPhone = registration.getCellPhone();
            boolean infected = registration.isInfected();

            registration.setCountry(country);

            // Save the registration
            Registration _registration = registrationRepository.save(registration);
            return new ResponseEntity<>(_registration, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Handles the request to the root URL ("/") and returns a welcome message.
     * @return Welcome message
     */

    @GetMapping("/")
    public String home() {
        return "Welcome to the registration system!";
    }

}
