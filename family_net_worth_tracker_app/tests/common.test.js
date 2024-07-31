import {expect, test} from 'vitest';
const { validateEmail } = require( "../common/input_cleaning");

test('Validates input email', () => {
    expect(validateEmail('test@example.com')).toBe(true)
    expect(validateEmail('user.name+tag+sorting@example.com')).toBe(true)
    expect(validateEmail('x@example.com')).toBe(true)
    expect(validateEmail('email@subdomain.example.com')).toBe(true)
    expect(validateEmail('firstname.lastname@example.com')).toBe(true)
    expect(validateEmail('email@123.123.123.123')).toBe(true)
    expect(validateEmail('email@[123.123.123.123]')).toBe(true)
    expect(validateEmail('"email"@example.com')).toBe(true)
    expect(validateEmail('1234567890@example.com')).toBe(true)
    expect(validateEmail('email@example-one.com')).toBe(true)

    expect(validateEmail('plainaddress')).toBe(false)
    expect(validateEmail('@missingusername.com')).toBe(false)
    expect(validateEmail('<script>stealyostuff@please.com<script>!@@41')).toBe(false)


})
