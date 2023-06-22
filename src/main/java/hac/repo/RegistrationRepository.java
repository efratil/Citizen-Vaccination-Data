package hac.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    /**
     * Retrieves registrations based on the city.
     * @param city City filter parameter
     * @return List of registrations matching the city
     */
    List<Registration> findByCity(String city);
    /**
     * Retrieves registrations based on the birth date range.
     * @param startDate Start date filter parameter
     * @param endDate End date filter parameter
     * @return List of registrations within the birth date range
     */
    List<Registration> findByBirthDateBetween(LocalDate startDate, LocalDate endDate);

    /**
     * Retrieves registrations based on the birth date range and city.
     * @param startDate Start date filter parameter
     * @param endDate End date filter parameter
     * @param city City filter parameter
     * @return List of registrations within the birth date range and matching the city
     */
    List<Registration> findByBirthDateBetweenAndCity(LocalDate startDate, LocalDate endDate, String city);
}
