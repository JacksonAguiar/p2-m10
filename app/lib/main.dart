import 'package:flutter/material.dart';
import 'package:ponderada/services.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final service = UserService();
  List users = [];
  TextEditingController controller1 = TextEditingController();
  TextEditingController controller2 = TextEditingController();

  @override
  void dispose() {
    controller1.dispose();
    controller2.dispose();
    super.dispose();
  }

  @override
  void initState() {
    fecthUsers();
    super.initState();
  }

  fecthUsers() async {
    var _users = await service.fetch();
    setState(() {
      users = _users;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: SingleChildScrollView(
          child: Column(
            // mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              TextField(
                controller: controller1,
                decoration:
                    const InputDecoration(label: Text("Digite seu nome")),
              ),
              TextField(
                controller: controller2,
                decoration: const InputDecoration(label: Text("Digite email")),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                    fixedSize: const Size(double.maxFinite, 45)),
                onPressed: () async {
                  await service.create(
                      {"name": controller1.text, "email": controller2.text});
                  await fecthUsers();
                  controller1.clear();
                  controller2.clear();
                },
                child: const Text('Adicionar'),
              ),
              const SizedBox(height: 20),
              const Text(
                "Usuarios",
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
              ListView.builder(
                itemCount: users.length,
                shrinkWrap: true,
                itemBuilder: (context, index) {
                  final user = users[index];
                  return ListTile(
                    title: Text(user["name"]),
                    subtitle: Text(user["email"]),
                    trailing: IconButton(
                        onPressed: () async {
                          await service.delete(user["id"]);
                          await fecthUsers();
                        },
                        icon: const Icon(Icons.delete)),
                  );
                },
              )
            ],
          ),
        ),
      ),
    );
  }
}
