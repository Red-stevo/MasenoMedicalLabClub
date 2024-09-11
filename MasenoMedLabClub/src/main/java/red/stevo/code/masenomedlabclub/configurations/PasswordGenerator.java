package red.stevo.code.masenomedlabclub.configurations;

import org.springframework.context.annotation.Configuration;

import java.security.SecureRandom;
@Configuration
public class PasswordGenerator {

    // Characters to be used in the password
    private static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String DIGITS = "0123456789";
    private static final String SPECIAL_CHARACTERS = "!@#$%^&*()-_=+[]{}|;:,.<>?";
    private static final String ALL_CHARACTERS = UPPER + LOWER + DIGITS + SPECIAL_CHARACTERS;

    // SecureRandom for cryptographically strong random number generation
    private static final SecureRandom RANDOM = new SecureRandom();

    public  String generateRandomPassword(int length) {
        if (length < 8) {
            throw new IllegalArgumentException("Password length must be at least 8 characters");
        }

        StringBuilder password = new StringBuilder(length);

        // Ensure password contains at least one character from each category
        password.append(UPPER.charAt(RANDOM.nextInt(UPPER.length())));
        password.append(LOWER.charAt(RANDOM.nextInt(LOWER.length())));
        password.append(DIGITS.charAt(RANDOM.nextInt(DIGITS.length())));
        password.append(SPECIAL_CHARACTERS.charAt(RANDOM.nextInt(SPECIAL_CHARACTERS.length())));

        // Fill the remaining length with random characters from all categories
        for (int i = 4; i < length; i++) {
            password.append(ALL_CHARACTERS.charAt(RANDOM.nextInt(ALL_CHARACTERS.length())));
        }

        // Shuffle the characters to ensure randomness
        return shufflePassword(password.toString());
    }

    // Method to shuffle the characters in the password for added randomness
    private static String shufflePassword(String password) {
        char[] characters = password.toCharArray();
        for (int i = characters.length - 1; i > 0; i--) {
            int index = RANDOM.nextInt(i + 1);
            char temp = characters[index];
            characters[index] = characters[i];
            characters[i] = temp;
        }
        return new String(characters);
    }

    /*public static void main(String[] args) {
        // Example usage
        String randomPassword = generateRandomPassword(12);
        System.out.println("Generated Password: " + randomPassword);
    }*/
}

