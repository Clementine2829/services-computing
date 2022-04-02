// C# program to generate random strings
using System;

namespace ClementineInn.RandomChars
{
	class RandomChars
	{
		public static string GetRandomChars(int size)
		{
			Random res = new Random();

			// String of alphabets
			String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

			// Initializing the empty string
			String ran = "";

			for (int i = 0; i < size; i++)
			{

				// Selecting a index randomly
				int x = res.Next(36);

				// Appending the character at the
				// index to the random string.
				ran += str[x];
			}
			return ran;
		}
	}
}