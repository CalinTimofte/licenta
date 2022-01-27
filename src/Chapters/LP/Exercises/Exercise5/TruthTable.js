import React from "react";

export default function TruthTable(){
    return(
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">φ</th>
                        <th scope="col">ψ</th>
                        <th scope="col">φ ∨ ψ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>false</td>
                        <td>false</td>
                        <td>
                            <label for="truth-values">Choose truth value:</label>
                            <select class="form-select" id="truth-values" name="truth-values">
                            <option value="true">true</option>
                            <option value="false">false</option>
                            </select> 
                        </td>
                    </tr>
                    <tr>
                        <td>false</td>
                        <td>true</td>
                        <td>
                            <label for="truth-values">Choose truth value:</label>
                            <select class="form-select" id="truth-values" name="truth-values">
                            <option value="true">true</option>
                            <option value="false">false</option>
                            </select> 
                        </td>
                    </tr>
                    <tr>
                        <td>true</td>
                        <td>false</td>
                        <td>
                            <label for="truth-values">Choose truth value:</label>
                            <select class="form-select" id="truth-values" name="truth-values">
                            <option value="true">true</option>
                            <option value="false">false</option>
                            </select> 
                        </td>
                    </tr>
                    <tr>
                        <td>true</td>
                        <td>true</td>
                        <td>
                            <label for="truth-values">Choose truth value:</label>
                            <select class="form-select" id="truth-values" name="truth-values">
                            <option value="true">true</option>
                            <option value="false">false</option>
                            </select> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}