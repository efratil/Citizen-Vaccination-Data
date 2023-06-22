package hac.repo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
public class Registration implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private LocalDate birthDate;
    private String address;
    private String country;
    private String city;
    private String zipCode;
    private String landLine;
    private String cellPhone;
    private boolean infected;
    /**
     * Default constructor for the Registration class.
     */

    public Registration() {
    }

    private String selectedCountry;

    public String getSelectedCountry() {
        return selectedCountry;
    }

    public void setSelectedCountry(String selectedCountry) {
        this.selectedCountry = selectedCountry;
    }
    /**
     * Constructor for the Registration class with parameters.
     * @param firstName First name of the registration
     * @param lastName Last name of the registration
     * @param birthDate Birth date of the registration
     * @param address Address of the registration
     * @param country Country of the registration
     * @param city City of the registration
     * @param zipCode Zip code of the registration
     * @param landLine Landline number of the registration
     * @param cellPhone Cellular phone number of the registration
     * @param infected Indicates if the registration has been infected by COVID-19 before
     */

    public Registration(String firstName, String lastName, LocalDate birthDate, String address, String country, String city, String zipCode, String landLine, String cellPhone, boolean infected) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.address = address;
        this.country = country;
        this.city = city;
        this.zipCode = zipCode;
        this.landLine = landLine;
        this.cellPhone = cellPhone;
        this.infected = infected;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getLandLine() {
        return landLine;
    }

    public void setLandLine(String landLine) {
        this.landLine = landLine;
    }

    public String getCellPhone() {
        return cellPhone;
    }

    public void setCellPhone(String cellPhone) {
        this.cellPhone = cellPhone;
    }

    public boolean isInfected() {
        return infected;
    }

    public void setInfected(boolean infected) {
        this.infected = infected;
    }
}
