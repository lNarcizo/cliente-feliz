<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ClientRequest;
use App\Client;

class ClientController extends Controller
{

    public function __construct(){
        $this->middleware(['auth', 'verified']);
    }

    public function index()
    {
        $clients = Client::all();

        return view('client.index', compact('clients'));
    }

    public function store(ClientRequest $request)
    {

        try{

            $client = new Client();

            $client->nome     = $request->nome;
            $client->cpfCnpj  = $request->cpfCnpj;
            $client->cep      = $request->cep;
            $client->cidade   = $request->cidade;
            $client->endereco = $request->endereco;

            $client->save();
            
            $json = json_encode([
                'error' => false,
                'message' => 'Cliente criado'
            ]);

        } catch(Exception $ex) {

            $json = json_encode([
                'error' => true,
                'message' => $ex->getMessage()
            ]);

        }

        echo $json;
        return;

    }

    public function destroy($id)
    {
        try{
            Client::FindOrFail($id)->delete();

            $json = json_encode([
                'error' => false,
                'message' => 'Cliente excluido'
            ]);

        } catch(Exception $ex) {

            $json = json_encode([
                'error' => true,
                'message' => $ex->getMessage()
            ]);
        }

        echo $json;
        return;
    }

    public function edit($id)
    {

        try{

            $client = Client::FindOrFail($id);

            $json = json_encode([
                'error' => false,
                'dados' => $client
            ]);

        } catch(Exception $ex) {

            $json = json_encode([
                'error' => true,
                'message' => $ex->getMessage()
            ]);
        }
        

        echo $json;
        return;

    }

    public function update(ClientRequest $request)
    {
        try{
            Client::FindOrFail($request->id)->update($request->all());

            $json = json_encode([
                'error' => false,
                'message' => 'Cliente editado'
            ]);

        } catch(Exception $ex) {

            $json = json_encode([
                'error' => true,
                'message' => $ex->getMessage()
            ]);
        }

        echo $json;
        return;
    }

}
