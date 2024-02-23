import Text from "@/components/Text";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import React from "react";
import CarouselComponent from "@/components/carousel";
import RegisterForm from "@/pages_components/RegisterForm";

export default function Home() {
  return (
    <main>
      <div>
        <Text type="title-24-bold" color="neutral-1">
          Khoá tiếng nhật quyết chiến N2
        </Text>
        <Button type="btn-secondary">test</Button>
        <CarouselComponent numberItemShow={4} itemNumber={8}>
          <div>item1</div>
          <div>item2</div>
          <div>item3</div>
          <div>item4</div>
          <div>item5</div>
          <div>item6</div>
          <div>item7</div>
          <div>item8</div>
        </CarouselComponent>
        <RegisterForm />
      </div>
    </main>
  );
}
