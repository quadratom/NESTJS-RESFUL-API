import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
// import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const { HttpAdapter } = this.HttpAdapterHost
   const { HttpAdapter } = app.get(HttpAdapterHost)
   app.useGlobalFilters( new AllExceptionsFilter(HttpAdapter))

  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3000);
}


// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, {
//     bufferLogs : true,
//   });
//   app.useLogger(app.get(MyLoggerService))
//   app.enableCors();
//   app.setGlobalPrefix('api');
//   await app.listen(3000);
// }

bootstrap();
