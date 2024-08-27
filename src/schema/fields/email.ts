export const email = {
  name: 'email',
  title: 'Email',
  type: 'string',
  description: "Enter the email address.",
  validation: (Rule:any) =>
		Rule.regex(
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
			{
				name: "email",
				invert: false,
			}
		),
}