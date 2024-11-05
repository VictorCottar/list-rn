import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

interface AuthLinkProps {
  text: string;
  linkText: string;
  href: string;
}

export function AuthLink({ text, linkText, href }: AuthLinkProps) {
  return (
    <View className='flex flex-row justify-center w-full h-6 mt-5'>
      <Text className='text-base font-bold'>{text}</Text>
      <TouchableOpacity activeOpacity={1}>
        <Text>
          <Link className='text-base font-bold underline' href={href}>
            {linkText}
          </Link>
        </Text>
      </TouchableOpacity>
    </View>
  );
}