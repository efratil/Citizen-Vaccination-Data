package hac.repo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Handles the request to the root URL ("/") and returns a welcome message.
 * @return Welcome message
 */

@RestController
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "Welcome to the registration system!";
    }
}
