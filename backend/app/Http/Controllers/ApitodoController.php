<?php

namespace App\Http\Controllers;

use App\Models\apitodo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApitodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $now = date('y-m-d H:i:s');
        try{

            $data = DB::table('apitodos')->get();
            
            $response["success"]=[
                "statusCode"=>200,
                "success Message"=>"found all todo data",
                "server reference code"=>$now,
                //"todo_data"=>$data
            ];
            $response["todo_data"]=$data;
            return response()->json($response);
        }
        catch(\Exception $e){
            $response ["success"]=[
                "statusCode"=>501,
                "success Message"=>"error in todo table",
                "server reference code"=>$now
            ];
            $message="Message: ".$e->getMessage().",File:".$e->getFile().",Line:".$e->getLine();
       
            return response()->json($response);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //return response()->json(['response' => $request, 'some_message' => 'Hit']);
        
        $now=date('Y-m-d H:i:s');
       try{
            $todo_data=$request->input('todo_data');
           
            $todo=$todo_data['todo'];
            $tip=$todo_data['tip'];
            $cp=$todo_data['cp'];

            $data=array(
                'todo'=>$todo,
                'task_in_progress'=>$tip,
                'task_done'=>$cp
            );

            $check_id=DB::table('apitodos')->get();
            $id=$check_id[0]->id;
            //return response()->json($id);
            
           if(count($check_id)<=0){
                //return response()->json('here  '.$id);
                $db_insert= DB::table('apitodos')->insert($data);
            }
            else{
                //return response()->json('there  '.$id);
                $db_insert2= DB::table('apitodos')->where('id',$id)->update(array('todo' => $data['todo'],'task_in_progress'=>$data['task_in_progress'],'task_done'=>$data['task_done']));
            }
            if(isset($db_insert)){
                $response["success"]=[
                    "statusCode"=>204,
                    "success Message"=>"data inserted",
                    "server reference code"=>$now
                ];
                $response["data"] =$data;
                return response()->json($response);
            }
            else{
                $response["success"]=[
                    "statuc Code" => 300,
                    "success message"=>"data updated",
                    "server reference code"=>$now
                ];
                $response['data']=$data;
                return response()->json($response);
            }
            $response["success"]=[
                "statuc Code" => 300,
                "success message"=>"data updated",
                "server reference code"=>$now
            ];
            $response['data']=$data;
            return response()->json($response);
           }
       catch(\Exception $e){
            $response ["success"]=[
                "statusCode"=>501,
                "success Message"=>"error in insertion of todo table",
                "server reference code"=>$now
            ];
            $message="Message: ".$e->getMessage().",File:".$e->getFile().",Line:".$e->getLine();
            return response()->json($response);
        }  
   
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\apitodo  $apitodo
     * @return \Illuminate\Http\Response
     */
    public function show(apitodo $apitodo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\apitodo  $apitodo
     * @return \Illuminate\Http\Response
     */
    public function edit(apitodo $apitodo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\apitodo  $apitodo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, apitodo $apitodo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\apitodo  $apitodo
     * @return \Illuminate\Http\Response
     */
    public function destroy(apitodo $apitodo)
    {
        //
    }
}
