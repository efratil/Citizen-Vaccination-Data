package hac;

import hac.repo.Registration;
import hac.repo.RegistrationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/debug")
public class DebugController {
    private final RegistrationRepository registrationRepository;
    /**
     * Constructs a new DebugController instance.
     * @param registrationRepository The RegistrationRepository to interact with the database
     */
    public DebugController(RegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    /**
     * Retrieves a list of all registrations.
     * @return List of registrations
     */
    @GetMapping("/registrations")
    public List<Registration> showRegistrations() {
        return registrationRepository.findAll();
    }

    /**
     * Adds a new registration.
     * @param registration The Registration object to be added
     * @return The added Registration object
     */
    @PostMapping("/registrations")
    public Registration addRegistration(@RequestBody Registration registration) {
        return registrationRepository.save(registration);
    }
}
